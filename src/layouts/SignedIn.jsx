import React from 'react'
import { Dropdown, Menu,Image } from 'semantic-ui-react'

export default function SignedIn({signOut}) {
    return (
        <div>
            <Menu.Item>
                <Image avatar spaced="right" src="https://lh3.googleusercontent.com/a-/AOh14GhwA-2BbQ568ITGL17t5-Ki9jAp_WD6sqwjBGkHaA=s96-c-rg-br100"/>
                <Dropdown pointing="top left" text="Burak">
                    <Dropdown.Menu>
                        <Dropdown.Item text="Bilgilerim" icon="info"/>
                        <Dropdown.Item onClick={signOut} text="Çıkış Yap" icon="sign-out"/>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    )
}
