import { Constants } from '../components/common/constants';

export async function getPersonAttributeTypeUuid(attributeName) {
  try {
    const url =
      Constants.personAttributeType + '?q=' + attributeName + '&v=default';
    const response = await fetch(url).then(function(response) {
      if (!response.status === 200) {
        throw Error({ response: response });
      }
      return response.json();
    });
    return response.results[0].uuid;
  } catch (error) {
    console.error(error);
    return error.response;
  }
}

export async function savePerson(payload) {
  try {
    return await fetch(Constants.person, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      credentials: 'include'
    });
  } catch (error) {
    console.error(error);
    return error.response;
  }
}

export async function searchPerson(person) {
  try {
    const url =
      Constants.person +
      '?q=' +
      person +
      '&v=custom%3Auuid%2Cdisplay%2Cage%2Cgender%2CdateCreated';
    return await fetch(url, {
      method: 'GET',
      credentials: 'include'
    });
  } catch (error) {
    console.error(error);
    return error.response;
  }
}

export async function fetchPerson(uuid) {
  try {
    const url = Constants.person + '/' + uuid;
    return await fetch(url, {
      method: 'GET',
      credentials: 'include'
    });
  } catch (error) {
    console.error(error);
    return error.response;
  }
}

export async function updatePerson(uuid, payload) {
  try {
    const url = Constants.person + '/' + uuid;
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      credentials: 'include'
    });
  } catch (error) {
    console.error(error);
    return error.response;
  }
}

export async function fetchPersonAttributeConfig() {
  try {
    const url = Constants.registrationConfig;
    return await fetch(url, {
      method: 'GET',
      credentials: 'include'
    });
  } catch (error) {
    console.error(error);
    return error.response;
  }
}
