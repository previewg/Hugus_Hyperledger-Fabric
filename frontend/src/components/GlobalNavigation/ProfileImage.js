import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {ProfileViewer} from "../../actions/auth";
import styled from "styled-components";


const Profile_Img = styled.div`
.user__icon {
      width: 35px;
    }
`
const ProfileImage = () => {


    const profile_data = useSelector(
        (state) => state.authentication.profile.data
    );
    const profile_status = useSelector(
        (state) => state.authentication.profile.status
    )
    const isSignedIn = useSelector(
        (state) => state.authentication.status.isLoggedIn
    );
    const dispatch = useDispatch();

    const [path , setPath] = useState(null);



    dispatch(ProfileViewer())

    return (
        <Profile_Img>

            <Link to="/my">
                {isSignedIn ? <img
                        className="user__icon"
                        src={
                            "http://localhost:3000/user_profile/"
                        }
                    />
                    :
                    <img
                        className="user__icon"
                        alt="user__icon"
                        src="/icons/user.png"
                    />}

            </Link>

        </Profile_Img>
    )
}
export default ProfileImage