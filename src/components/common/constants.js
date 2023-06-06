const hostUrl = localStorage.getItem('host')
  ? 'https://' + localStorage.getItem('host')
  : '';
const RESTWS_V1 = hostUrl + '/openmrs/ws/rest/v1';
export const Constants = {
  person: RESTWS_V1 + '/person',
  personAttributeType: RESTWS_V1 + '/personattributetype'
};
export const genderOptions = ['', 'Male', 'Female', 'Other'];
export const personAttributes = {
  organization: 'organization',
  email: 'email',
  mobilePhone: 'mobilePhone',
  workPhone: 'workPhone',
  residencePhone: 'residencePhone',
  otherPhone: 'otherPhone',
  occupation: 'occupationNew'
};
