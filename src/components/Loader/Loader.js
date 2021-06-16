import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

export const LoaderExampleText = () => (
  <div>
    <Segment>
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>
  </div>
)

