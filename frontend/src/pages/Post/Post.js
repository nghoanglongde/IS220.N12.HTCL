import { useState, useEffect } from 'react';
import './Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart} from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { style } from '@mui/system';
import { Toggle } from '@mui/material';


function PostDetail() {
    const [state,setState] = useState(false);

    const [dataImg, setDataImg] = useState([]);
    const [imagePostDetail, setImagePostDetail] = useState();
    const [titlePostDetail, setTitlePostDetail] = useState();
    const [userImgPostDetail, setUserImgPostDetail] = useState();
    const [userNamePostDetail, setUserNamePostDetail] = useState();
    const [comments, setComments] = useState([]);
    const [userIDPostDetail, setUserIDPostDetail] = useState();
    const [enterComment, setenterComment] = useState([]);
    const [visible, setVisible] = useState(2);
    
    const navigate = useNavigate();
    let { post_id } = useParams();
    const cookies = new Cookies();
    let cookie = cookies.get('user_id');


    useEffect(() => {
        const resPostDetailData = async () => {
            await axios.post('http://localhost:5000/post/detail', {
                "post_id": post_id
            })
            .then(function (response) {
                console.log(response);
                if (response.data.statuscode == 200) {
                    setImagePostDetail(response.data.message.image);
                    setTitlePostDetail(response.data.message.title);
                    setUserImgPostDetail(response.data.message.user_image);
                    setUserNamePostDetail(response.data.message.user_name);
                    setComments(response.data.message.comments_id);
                    setUserIDPostDetail(response.data.message.user_id);
                } else {
                    console.log(response)
                    Swal.fire({
                        text: 'Failed to get post detail',
                        icon: 'error'

                    })
                }

            })
            .catch(function (error) {
                Swal.fire({
                    text: 'error',
                    icon: 'error'
                })
            }
            )
        }
        const resData = async () => {
            const response = await axios.get('http://localhost:5000/post/homepage');
            setDataImg(response.data.message);
        }
        resData();
        resPostDetailData();
        const allIcon = document.querySelectorAll(".iconContainer");

        function setMenuActive() {
            allIcon.forEach((n) => n.classList.remove("active"));
            this.classList.add("active");
        }

        allIcon.forEach(n => n.addEventListener('click', setMenuActive));
    }, []);

    console.log(comments)
    async function handleCmApi(event) {
        event.preventDefault();
        await axios.post('http://localhost:5000/post/comment', {
            "post_id": post_id,
            "user_send_cmt_id": cookie,
            "comment": enterComment
        })
        .then(function (response) {
            console.log(response);
            if (response.data.statuscode == 200) {
                Swal.fire({
                    text: 'Add comment success',
                    icon: 'success'
                })
                setComments(comments => [...comments, {
                    user_avatar: localStorage.getItem("avatar"),
                    user_name: localStorage.getItem("fullname"),
                    comment: enterComment
                }])
            } else {
                console.log(response)
                Swal.fire({
                    text: 'Failed to comment',
                    icon: 'error'
                })
            }

        })
        .catch(function (error) {
            Swal.fire({
                text: 'error',
                icon: 'error'
            })
        }
        )
    }

    const getImg = (post_id) => {
        console.log(post_id);
        window.location = "/viewpost/" + post_id;
    }

    function savePost(event){
        event.preventDefault();
        axios.post('http://localhost:5000/post/save-post', {
            "post_id": post_id,
            "user_save_post_id": cookie
        })
        .then(function (response) {
            console.log(response);
            if (response.data.statuscode == 200) {
                Swal.fire({
                    text: 'Save post success',
                    icon: 'success'
                })
            } else {
                console.log(response)
                Swal.fire({
                    text: 'Failed to get post detail',
                    icon: 'error'
                })
            }

        })
        .catch(function (error) {
            Swal.fire({
                text: 'error',
                icon: 'error'
            })
        }
        )
    }

    function clickFollow(event){
        event.preventDefault();
        axios.post('http://localhost:5000/user/follow', {
            "user_id": cookie,
            "wanna_fl_user_id": userIDPostDetail
        })
        .then(function (response) {
            console.log(response);
            if (response.data.statuscode == 200) {
                Swal.fire({
                    text: 'Follow succes',
                    icon: 'success'
                })
            } else {
                console.log(response)
                Swal.fire({
                    text: 'Failed follow this user',
                    icon: 'error'
                })
            }

        })
        .catch(function (error) {
            Swal.fire({
                text: 'error',
                icon: 'error'
            })
        }
        )
    }
    const toggle = () =>{
        setState(!state);
    }
    
    const showMoreComment = () =>{
        setVisible((prevValue) => prevValue + 2);
    }

    const hideComment = () =>{
        setVisible((prevValue) => prevValue - 2);
    }
    return (
        <div className='PostView'>
             <div className="form1">
                <div class="wrapper1">
                    <div className="uploadImage1">
                        <div className="frameImage1">  
                            <img src={imagePostDetail}/>
                        </div>
                    </div>
                </div>
                <div className="imageContent1">
                        <div className='ContainerButtonSave'>
                            <button className="buttonSave" onClick={savePost}>
                                        <span >Save</span> 
                            </button>
                        </div>
                        <div className='postTitle'>
                            <label>{titlePostDetail}</label>
                        </div>
                        <div className='upLoadBy'>
                            <img src={userImgPostDetail}/>
                            <label>{userNamePostDetail}</label>
                            <button className="buttonFollow" onClick={clickFollow}>
                                        <span >Follow</span> 
                            </button>
                        </div>
                            <div className='comment'>
                                <input
                                    type="text"
                                    className="comment-input"
                                    placeholder="Enter your comment"
                                    required
                                    onChange={event => setenterComment(event.target.value)}
                                    value={enterComment}
                                />
                            </div>
                            <div className='submitComment'>
                                <button className="doneComment" onClick={handleCmApi}>
                                            <span>Done</span> 
                                </button>
                                <button className="dropComment" onClick ={() =>{setenterComment("");}}>
                                            <span>Cancel</span> 
                                </button>
                            </div>
                        <div className = 'commentUser' required>
                            <div className = "commentTitle"> Comment </div>
                            {comments.slice(0,visible).map((item, index) => {
                            return (
                                <div className='enterComment'>
                                    <img src={item.user_avatar}/>
                                    <div className='ContentComment'>
                                        <div className="commentContent" key={index}>
                                            <p><a>{item.user_name}  </a>
                                            {item.comment}</p>
                                        </div>
                                        <div className='heartEffect'>
                                            <button className='useheart'>
                                                <FontAwesomeIcon icon = {faHeart} 
                                                className = "heart"
                                                // onClick = {toggle} className = {'heart ' + (state ? 'redcolor':'')}
                                                />
                                            </button>
                                            <p>useful</p>
                                        </div>
                                    </div>
                                </div>   
                            )
                            })}
                            <div className='moreComment'>
                                <button className="showComment" onClick={showMoreComment}>
                                            <span>load more</span> 
                                </button>
                                <button className="dropComment" onClick ={hideComment}>
                                            <span>hide</span> 
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
            <div className='posts'>
                <div className="menuImage1">
                    {dataImg.map((item, index) => {
                        if(item.post_type == 'self_created'){
                            return (
                                <div className="pics1" key={index} onClick = {() => getImg(item.post_ref_id)}>
                                    <img src={item.image} className="imagemenu1" />
                                </div>                 
                            )
                        }
                    })}

                </div>
            </div>
        </div>
    );
}

export default PostDetail;
