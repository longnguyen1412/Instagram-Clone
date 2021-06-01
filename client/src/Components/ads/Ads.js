import React, {useEffect, useState, useContext} from 'react'
import {Link} from "react-router-dom"
import './Ads.css'
import { UserContext } from '../../App'


const User = (props) => {
    const { state } = useContext(UserContext)
    const [isFollow, setIsFollow] = useState(props.followers.includes(state._id))

    const theoDoiOnClick = (e) => {
        fetch('/api/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                followId: props._id
            })
        })
            .then(res => res.json())
            .then(user => {
                if(user) {
                    if(user.error) {
                        console.log("Follow Error!")
                    } else {
                        console.log("Follow success!")
                    }
                } else {
                    console.log("Follow Error!")
                }
            })
            .catch(err => {
                console.log(err)
            })

        setIsFollow(true)
    }

    const boTheoDoiOnClick = (e) => {
        fetch('/api/unfollow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                unFollowId: props._id
            })
        })
            .then(res => res.json())
            .then(user => {
                if(user) {
                    if(user.error) {
                        console.log("Unfollow Error!")
                    } else {
                        console.log("Unfollow success!")
                    }
                } else {
                    console.log("Unfollow Error!")
                }
            })
            .catch(err => {
                console.log(err)
            })

        setIsFollow(false)
    }

    return (
        <div className="goiY">
            <div className="person">
                <div className="avatar">
                    <img src={props.urlAvatar} alt="load..." />
                </div>
                <div className="info">
                    <Link to={`/profile/${props._id}`}>
                        <b>{props.nickname}</b>
                    </Link> <br />
                    <span>{props.name}</span>
                </div>
            </div>
            {
                isFollow ?
                    <div className="bo-theo-doi" onClick={boTheoDoiOnClick}>Bỏ theo dõi</div>
                :
                    <div className="theoDoi" onClick={theoDoiOnClick}>Theo dõi</div>
            }
        </div>
    )
}

const Ads = () => {
    const [users, setUsers] = useState(null)

    useEffect(() => {
        fetch('/api/randomuser?amount=3', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(data => data.json())
            .then(users => {
                setUsers(users)
            })
            .catch(err => console.log(err))
    }, [])

    return(
        <div className="Ads">
            <div className="personal-page">
                <div className="avatar">
                    <img src="img/info.jpg" alt="bug" />
                </div>
                <div className="info">
                    <b>longnguyen.442</b> <br/>
                    <span>Long Nguyễn</span>
                </div>
            </div>
            <div className="story khung">
                <div className="headerOfKhung">
                    <div>Tin</div>
                    <div>Xem tất cả</div>
                </div>
                <div className="tin">
                    <div className="border-avatar">
                        <div className="avatar">
                            <img src="img/1.jpg" alt="bug" />
                        </div>
                    </div>
                    <div className="info">
                        <b>diep_bosua_</b> <br />
                        <span>20 PHÚT TRƯỚC</span>
                    </div>
                </div>
                <div className="tin">
                    <div className="border-avatar">
                        <div className="avatar">
                            <img src="img/2.jpg" alt="bug" />
                        </div>
                    </div>
                    <div className="info">
                        <b>kiimyen</b> <br />
                        <span>1 GIỜ TRƯỚC</span>
                    </div>
                </div>
                <div className="tin">
                    <div className="border-avatar">
                        <div className="avatar">
                            <img src="img/3.jpg" alt="bug" />
                        </div>
                    </div>
                    <div className="info">
                        <b>lananh11112000</b> <br />
                        <span>1 NGÀY TRƯỚC</span>
                    </div>
                </div>
            </div>
            <div className="suggestions khung">
                <div className="headerOfKhung">
                    <div>Gợi ý cho bạn</div>
                    <div>Xem tất cả</div>
                </div>
                {
                    users
                    &&
                    users.map(user => {
                        return <User {...user} key={user._id}></User>
                    })
                }
            </div>
            <div className="gioiThieu">
                <ul>
                    <li><a href="/">Giới thiệu</a></li>
                    <li><a href="/">Trợ giúp</a></li>
                    <li><a href="/">Báo chí</a></li>
                    <li><a href="/">API</a></li>
                    <li><a href="/">Việc làm</a></li>
                    <li><a href="/">Quyền riêng tư</a></li>
                    <li><a href="/">Điều khoản</a></li>
                    <li><a href="/">Vị trí</a></li>
                    <li><a href="/">Tài khoản liên quan nhất</a></li>
                    <li><a href="/">Hashtag</a></li>
                    <li><a href="/">Ngôn ngữ</a></li>
                </ul>
                <div>© 2020 INSTAGRAM FROM FACEBOOK</div>
            </div>
        </div>
    )
}

export default Ads