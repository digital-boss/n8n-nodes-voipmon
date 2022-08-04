import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class VoipmonApi implements ICredentialType {
	name = 'voipmonApi';
	displayName = 'Voipmon API';
	documentationUrl = 'voipmon';
	properties: INodeProperties[] = [
		// The credentials to get from user and save encrypted.
		// Properties can be defined exactly in the same way
		// as node properties.
		{
			displayName: 'Url',
			name: 'url',
			type: 'string',
			default: '',
		},
		{
			displayName: 'User',
			name: 'user',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
}
