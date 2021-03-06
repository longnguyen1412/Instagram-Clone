import React from 'react'
import './Ads.css'

const Ads = ()=>{
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
                            <img src="img/avt-diep.jpg" alt="bug" />
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
                            <img src="img/KY-avatar.jpg" alt="bug" />
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
                            <img src="img/la.jpg" alt="bug" />
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
                <div className="goiY">
                    <div className="person">
                        <div className="avatar">
                            <img src="img/avtThao.jpg" alt="bug" />
                        </div>
                        <div className="info">
                            <b>thao.106520</b> <br />
                            <span>Bạn bè trên Facebook</span>
                        </div>
                    </div>
                    <div className="theoDoi">Theo dõi</div>
                </div>
                <div className="goiY">
                    <div className="person">
                        <div className="avatar">
                            <img src="img/avtThao.jpg" alt="bug" />
                        </div>
                        <div className="info">
                            <b>thao.106520</b> <br />
                            <span>Bạn bè trên Facebook</span>
                        </div>
                    </div>
                    <div className="theoDoi">Theo dõi</div>
                </div>
                <div className="goiY">
                    <div className="person">
                        <div className="avatar">
                            <img src="img/avtThao.jpg" alt="bug" />
                        </div>
                        <div className="info">
                            <b>thao.106520</b> <br />
                            <span>Bạn bè trên Facebook</span>
                        </div>
                    </div>
                    <div className="theoDoi">Theo dõi</div>
                </div>
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