const hostUrl = localStorage.getItem('host')
  ? 'https://' + localStorage.getItem('host')
  : '';
const RESTWS_V1 = hostUrl + '/openmrs/ws/rest/v1';
const bahmniConfig = hostUrl + '/bahmni_config';
export const Constants = {
  person: RESTWS_V1 + '/person',
  personAttributeType: RESTWS_V1 + '/personattributetype',
  registrationConfig: bahmniConfig + '/openmrs/apps/registration/app.json'
};
export const genderOptions = ['', 'Male', 'Female', 'Other'];
export const phoneNumberPattern = '[0-9]{10}';
export const emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
