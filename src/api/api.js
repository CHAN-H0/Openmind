const BASE_URL = 'https://openmind-api.vercel.app/6-13';

// ListPage 카드 데이터 받아오기
export async function getSubjects(params = {}) {
  // pageSize, page, sort를 rest객체에 추가해서
  // new URLSearchParams(rest).toString() 를 사용해 쿼리문자열로 변환해서 URL에 추가 합니다.
  const { pageSize, page, sort, ...rest } = params;

  if (pageSize && page) {
    rest.limit = pageSize;
    rest.offset = (page - 1) * pageSize;
  }
  if (sort) {
    rest.sort = sort;
  }

  const query = new URLSearchParams(rest).toString();

  try {
    const response = await fetch(`${BASE_URL}/subjects/?${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    console.log('body');
    console.log(body);
    return body;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

// 닉네임의 신규 피드 생성
export const createCard = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/subjects/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        team: '8',
      }),
    });

    if (response.ok) return response.json();
    return new Error('');
  } catch (e) {
    if (e instanceof Error) return e;
  }
};

// 질문카드 생성
export const createQuestionCard = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/subjects/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        team: '13',
      }),
    });

    if (response.ok) return response.json();
    return new Error('');
  } catch (e) {
    if (e instanceof Error) return e;
  }
};

// 주어진 ID를 사용해 사용자 데이터를 가져오는 함수
export async function getUserData(id) {
  try {
    const response = await fetch(`${BASE_URL}/subjects/${id}/`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Failed to fetch subject id:', error);
    throw error;
  }
}

// 모달창에서 사용자가 입력한 질문을 서버로 전송하는 함수
export async function submitQuestion(id, questionContent) {
  try {
    const response = await fetch(`${BASE_URL}/subjects/${id}/questions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: questionContent }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    console.log('질문이 성공적으로 전송되었습니다.');
    const submittedQuestion = await response.json();
    return submittedQuestion;
  } catch (error) {
    console.error('질문 전송에 실패했습니다. ', error);
    throw error;
  }
}

// 주어진 ID를 사용해 질문 데이터를 가져오는 함수
export async function getQuestionsByUserId(id, subjectId) {
  try {
    const response = await fetch(
      `${BASE_URL}/subjects/${subjectId}/questions/?userId=${id}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const questionData = await response.json();
    return questionData.results;
  } catch (error) {
    console.error('질문을 불러오는데 실패했습니다.', error);
    throw error;
  }
}

// 사용자 데이터를 기반으로 질문 데이터를 가져와 상태를 설정하는 함수
export async function fetchQuestionsByUser(userData, setQuestionData) {
  try {
    if (!userData || !userData.id) {
      console.error('사용자 데이터 또는 사용자 ID를 가져올 수 없습니다.');
      return;
    }
    const questionsData = await getQuestionsByUserId(userData.id);
    setQuestionData(questionsData);
  } catch (error) {
    console.error('질문을 불러오는데 실패했습니다.', error);
  }
}
