import { INodeProperties } from "n8n-workflow";

export const audioOperations: INodeProperties[] = [
	{
		displayName: "Operation",
		name: "operation",
		type: "options",
		displayOptions: {
			show: {
				resource: ["audio"],
			},
		},
		options: [
			{
				name: "List Active Calls",
				value: "listActiveCalls",
				description: "List Active Calls",
			},
			{
				name: "Get Voip Calls",
				value: "getVoipCalls",
				description: "Get Voip Calls",
			},
			{
				name: "Report Summary",
				value: "reportSummary",
				description: "Report Summary",
			},
			{
				name: "Get Pcap",
				value: "getPCAP",
				description: "Will return you the pcap file",
			},
		],
		default: "listActiveCalls",
		description: "The operation to perform",
	},
];

export const audioFields: INodeProperties[] = [
	/*-------------------------------------------------------------------------- */
	/*                                audio:listActiveCalls                      */
	/* ------------------------------------------------------------------------- */
	{
		displayName: "Sensor Id",
		name: "sensorId",
		type: "string",
		required: false,
		displayOptions: {
			show: {
				resource: ["audio"],
				operation: ["listActiveCalls"],
			},
		},
		default: "0",
		description: "Sensor number",
	},

	/*-------------------------------------------------------------------------- */
	/*                                audio:getVoipCalls                         */
	/* ------------------------------------------------------------------------- */
	{
		displayName: "Start Time",
		name: "startTime",
		type: "dateTime",
		required: true,
		displayOptions: {
			show: {
				resource: ["audio"],
				operation: ["getVoipCalls"],
			},
		},
		default: "",
		description: "All calls which started >= startTime",
	},
	{
		displayName: "End Time",
		name: "endTime",
		type: "dateTime",
		required: true,
		displayOptions: {
			show: {
				resource: ["audio"],
				operation: ["getVoipCalls"],
			},
		},
		default: "",
		description: "All calls which started >= startTime",
	},
	{
		displayName: "Start Time To",
		name: "startTimeTo",
		type: "dateTime",
		required: false,
		displayOptions: {
			show: {
				resource: ["audio"],
				operation: ["getVoipCalls"],
			},
		},
		default: "",
		description: "All calls which started <= startTimeTo",
	},
	{
		displayName: "Call End",
		name: "callEnd",
		type: "dateTime",
		required: false,
		displayOptions: {
			show: {
				resource: ["audio"],
				operation: ["getVoipCalls"],
			},
		},
		default: "",
		description: "All calls which started <= startTimeTo",
	},
	{
		displayName: "Caller",
		name: "caller",
		type: "number",
		required: true,
		displayOptions: {
			show: {
				resource: ["audio"],
				operation: ["getVoipCalls"],
			},
		},
		default: 0,
		description: "Caller number",
	},
	{
		displayName: "Called",
		name: "called",
		type: "number",
		required: false,
		displayOptions: {
			show: {
				resource: ["audio"],
				operation: ["getVoipCalls"],
			},
		},
		default: 0,
		description: "Called number",
	},
	{
		displayName: "Audit Reason",
		name: "auditReason",
		type: "string",
		required: false,
		displayOptions: {
			show: {
				resource: ["audio"],
				operation: ["getVoipCalls"],
			},
		},
		default: "",
		description: "Called number",
	},
	{
		displayName: "Only Connected",
		name: "onlyConnected",
		type: "options",
		required: false,
		displayOptions: {
			show: {
				resource: ["audio"],
				operation: ["getVoipCalls"],
			},
		},
		options: [
			{
				name: "Only connected calls",
				value: 0,
			},
			{
				name: "All calls",
				value: 1,
			},
		],
		default: 0,
		description: "Called number",
	},
	/*-------------------------------------------------------------------------- */
	/*                                audio:reportSummary                        */
	/* ------------------------------------------------------------------------- */
	{
		displayName: "Report Name",
		name: "reportName",
		type: "string",
		required: true,
		displayOptions: {
			show: {
				resource: ["audio"],
				operation: ["reportSummary"],
			},
		},
		default: "",
		description: "Description of report (only CDR reports allowed)",
	},
	{
		displayName: "Date Time From",
		name: "dateTimeFrom",
		type: "dateTime",
		required: true,
		displayOptions: {
			show: {
				resource: ["audio"],
				operation: ["reportSummary"],
			},
		},
		default: "",
		description: "Datetime from",
	},
	{
		displayName: "Date Time to",
		name: "dateTimeTo",
		type: "dateTime",
		required: true,
		displayOptions: {
			show: {
				resource: ["audio"],
				operation: ["reportSummary"],
			},
		},
		default: "",
		description: "Datetime from",
	},
	{
		displayName: "Json",
		name: "json",
		type: "options",
		required: false,
		displayOptions: {
			show: {
				resource: ["audio"],
				operation: ["reportSummary"],
			},
		},
		options: [
			{
				name: "Yes",
				value: true,
			},
			{
				name: "No",
				value: false,
			},
		],
		default: true,
	},
	/*-------------------------------------------------------------------------- */
	/*                                audio:getPCAP                              */
	/* ------------------------------------------------------------------------- */
	{
		displayName: "Call Id",
		name: "callId",
		type: "number",
		required: true,
		displayOptions: {
			show: {
				resource: ["audio"],
				operation: ["getPCAP"],
			},
		},
		default: "",
		description: "Description of report (only CDR reports allowed)",
	},
	{
		displayName: "Cid Interval",
		name: "cidInterval",
		type: "number",
		required: false,
		displayOptions: {
			show: {
				resource: ["audio"],
				operation: ["getPCAP"],
			},
		},
		default: 60,
		description: "Datetime from",
	},
	{
		displayName: "Cid Merge",
		name: "cidMerge",
		type: "options",
		required: false,
		displayOptions: {
			show: {
				resource: ["audio"],
				operation: ["getPCAP"],
			},
		},
		options: [
			{
				name: "Yes",
				value: true,
			},
			{
				name: "No",
				value: false,
			},
		],
		default: true,
	},
	{
		displayName: "Zip",
		name: "zip",
		type: "options",
		required: false,
		displayOptions: {
			show: {
				resource: ["audio"],
				operation: ["getPCAP"],
			},
		},
		options: [
			{
				name: "Yes",
				value: true,
			},
			{
				name: "No",
				value: false,
			},
		],
		default: false,
	},
];
