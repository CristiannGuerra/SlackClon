import React from 'react'
import './MembersList.css'
import MemberListItem from '../MemberListItem/MemberListItem'

const MembersList = ({ members }) => {

    if (members.length === 0) {
        return (
            <div>No members available</div>
        )
    }

    // const membersJsx = members.map((member, index) => {
    //     return (
    //         <MemberListItem member={member} key={index} />
    //     )
    // })

    return (
        <>
            {members.map((member, index) => {
                return (
                    <MemberListItem member={member.username} key={index} />
                )
            })}
        </>
    )
}

export default MembersList