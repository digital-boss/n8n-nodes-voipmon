import { IExecuteFunctions } from "n8n-core";

import {
	ICredentialsDecrypted,
	ICredentialTestFunctions,
	IDataObject,
	INodeCredentialTestResult,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	LoggerProxy,
	NodeApiError,
} from "n8n-workflow";

import { simplify, voipmonApiRequest } from "./GenericFunctions";

import { version } from "../version";
import { audioFields, audioOperations } from "./descriptions";

export class Voipmon implements INodeType {
	description: INodeTypeDescription = {
		displayName: "Voipmon",
		name: "Voipmon",
		icon: "file:voipmon.png",
		group: ["transform"],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: `Consume Voipmon API (v.${version})`,
		defaults: {
			name: "voipmon",
			color: "#FF6000",
		},
		inputs: ["main"],
		outputs: ["main"],
		credentials: [
			{
				name: "voipmonApi",
				required: true,
				// testedBy: "testVoipmonApiAuth",
			},
		],
		properties: [
			{
				displayName: "Resource",
				name: "resource",
				type: "options",
				options: [
					{
						name: "Audio",
						value: "audio",
					},
				],
				default: "audio",
				required: true,
				description: "Resource to consume",
			},
			...audioOperations,
			...audioFields,
		],
	};

	methods = {
		// credentialTest: {
		// 	async testVoipmonApiAuth(
		// 		this: ICredentialTestFunctions,
		// 		credential: ICredentialsDecrypted
		// 	): Promise<INodeCredentialTestResult> {
		// 		// https://docs.sendgrid.com/api-reference/users-api/retrieve-your-username
		// 		const options: OptionsWithUri = {
		// 			method: "GET",
		// 			headers: {},
		// 			qs: {
		// 				"auth-id": credential.data?.authId,
		// 				"auth-password": credential.data?.authPassword,
		// 			},
		// 			uri: "https://api.voipmon.net/login/login.json",
		// 			json: true,
		// 		};
		// 		try {
		// 			const response = await this.helpers.request(options);
		// 			if (response.status === "Failed") {
		// 				return {
		// 					status: "Error",
		// 					message: `${response.statusDescription}`,
		// 				};
		// 			}
		// 		} catch (err) {
		// 			return {
		// 				status: "Error",
		// 				message: `${err.message}`,
		// 			};
		// 		}
		// 		return {
		// 			status: "OK",
		// 			message: "Connection successful!",
		// 		};
		// 	},
		// },
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter("resource", 0) as string;
		const operation = this.getNodeParameter("operation", 0) as string;
		const body: IDataObject = {};
		let method = "";
		let endpoint = "";
		let qsTemp = {} as any;
		let params = {} as any;
		const qs: IDataObject = {};

		for (let i = 0; i < items.length; i++) {
			try {
				switch (resource) {
					case "audio":
						switch (operation) {
							case "listActiveCalls":
								// ----------------------------------
								//        audio:listActiveCalls
								// ----------------------------------

								if (this.getNodeParameter("sensorId", i))
									params["sensorId"] = this.getNodeParameter("sensorId", i);

								Object.assign(qs, {
									task: operation,
									params: JSON.stringify(params),
								});

								method = "GET";
								break;

							case "getVoipCalls":
								// ----------------------------------
								//        audio:getVoipCalls
								// ----------------------------------
								params["startTime"] = this.getNodeParameter("startTime", i);
								params["endTime"] = this.getNodeParameter("endTime", i);
								params["caller"] = this.getNodeParameter("caller", i);

								if (this.getNodeParameter("startTimeTo", i))
									params["startTimeTo"] = this.getNodeParameter(
										"startTimeTo",
										i
									);

								if (this.getNodeParameter("callEnd", i))
									params["callEnd"] = this.getNodeParameter("callEnd", i);

								if (this.getNodeParameter("called", i))
									params["called"] = this.getNodeParameter("called", i);

								if (this.getNodeParameter("onlyConnected", i))
									params["onlyConnected"] = this.getNodeParameter(
										"onlyConnected",
										i
									);

								qsTemp = {
									task: operation,
									called: this.getNodeParameter("caller", i),
									params: JSON.stringify(params),
								};

								if (this.getNodeParameter("auditReason", i))
									qsTemp["auditReason"] = this.getNodeParameter(
										"auditReason",
										i
									);

								Object.assign(qs, qsTemp);

								method = "GET";
								break;

							case "reportSummary":
								// ----------------------------------
								//        audio:reportSummary
								// ----------------------------------
								params["report_name"] = this.getNodeParameter("reportName", i);

								params["datetime_from"] = this.getNodeParameter(
									"dateTimeFrom",
									i
								);

								params["datetime_to"] = this.getNodeParameter("dateTimeTo", i);

								if (this.getNodeParameter("json", i))
									params["json"] = this.getNodeParameter("json", i);

								Object.assign(qs, {
									task: operation,
									params: JSON.stringify(params),
								});

								method = "GET";
								break;

							case "getPCAP":
								// ----------------------------------
								//        audio:getPCAP
								// ----------------------------------

								params["callId"] = this.getNodeParameter("callId", i);

								if (this.getNodeParameter("cidInterval", i))
									params["cidInterval"] = this.getNodeParameter("cidInterval", i);

								if (this.getNodeParameter("cidMerge", i))
									params["cidMerge"] = this.getNodeParameter("cidMerge", i);

								if (this.getNodeParameter("zip", i))
									params["zip"] = this.getNodeParameter("zip", i);

								Object.assign(qs, {
									task: operation,
									params: JSON.stringify(params),
								});

								method = "GET";
								break;

							default:
								break;
						}
						break;

					default:
						break;
				}

				responseData = await voipmonApiRequest.call(
					this,
					method,
					endpoint,
					body,
					qs
				);

				console.log("response", responseData);

				if (!responseData || Object.keys(responseData).length === 0) {
					responseData = { success: true };
				}

				if (!responseData.success) {
					throw new NodeApiError(this.getNode(), responseData);
				}

				if (responseData.rows) responseData = responseData.rows;

				if (operation === "getVoipCalls" && responseData.cdr)
					responseData = responseData.cdr;

				if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData as IDataObject[]);
				} else if (responseData !== undefined && responseData !== null) {
					returnData.push(responseData as IDataObject);
				} else {
					returnData.push({} as IDataObject);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
