import axios from 'axios';

// Action Type
// StoryAdd
const STORY_ADD = "STORY_ADD";
// StoryDelete
const STORY_DELETE = "STORY_DELETE";
// StoryUpdate
const STORY_UPDATE = "STORY_UPDATE";

// 게시물 등록
export const storyAdd = ({data}) => async dispatch => {
	await axios.post('/story/add', {...data} , {headers:{'content-type':'multipart/form-data'}})
		.then(response => {
			alert('성공적으로 등록되었습니다.');
		}).catch(error => {
			alert('등록에 실패하였습니다.')
		});
};

// 게시물 삭제
export const storyDelete = () => async dispatch => {
	await axios.delete('/story/delete')
		.then(response => {
			console.log('성공적으로 삭제되었습니다.')
		}).catch(error => {
			console.log('삭제에 실패하였습니다.')
		});
};

// 게시물 수정
export const storyUpdate = ({data}) => async dispatch => {
	await axios.put('/story/update', {data})
		.then(response => {
			alert('성공적으로 수정되었습니다.')
		}).catch(error => {
			alert('수정에 실패하였습니다.')
		});
};




