import React from 'react'
import { Button, Menu } from 'semantic-ui-react'

export default function SignedOut({signIn}) {
    return (
        <div>
            <Menu.Item>
              <Button.Group>
                <Button primary>Kayıt ol</Button>
                <Button.Or />
                <Button onClick={signIn} positive>Giriş yap</Button>
              </Button.Group>
            </Menu.Item>
        </div>
    )
}
