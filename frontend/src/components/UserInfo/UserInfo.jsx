import React from 'react'

const UserInfo = () => {
    return (
        <div>
            {/* Contenedor 1 */}
            <div >
                <div>
                    <div>Profile</div>
                    <button>X</button>
                </div>
                <div>
                    Profile IMG
                </div>
                <div>
                    <div>Cristian Guerra</div>
                    <a href="#">Edit</a>
                </div>
                <a href="#">
                    <div>+</div>
                    <div>Add name pronunciation</div>
                </a>
                <div>
                    <i>clock</i>
                    <span>local time</span>
                </div>
                <div>
                    <button>Set a status</button>
                    <button>View as</button>
                    <button>:</button>
                </div>

            </div>
            {/* Contenedor 2 */}
            <div>
                <div>
                    <div>Contact information</div>
                    <a href="#">Edit</a>
                </div>
                <div>
                    <div>message Icon</div>
                    <div>
                        <span>Email address</span>
                        <a href="#">email</a>
                    </div>
                </div>
                <a href="#">
                    <div>+</div>
                    <div>Add phone</div>
                </a>
            </div>
            {/* Contenedor 3 */}
            <div>
                <div>
                    <div>About me</div>
                    <a href="#">Edit</a>
                </div>
                <a href="#">
                    <div>+</div>
                    <div>Add date</div>
                </a>
            </div>
        </div>
    )
}

export default UserInfo