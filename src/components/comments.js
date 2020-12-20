import React from 'react'
import { Button, Comment, Form, Header, Container, Segment } from 'semantic-ui-react'

const Comments  = () => {
  return(
    <div>
        <Segment>
          <Container fluid>
            <Header as='h3'>Comments</Header>
            <Comment>
              <Comment.Content>
                <Comment.Text>How artistic!</Comment.Text>
              </Comment.Content>
            </Comment>
          </Container>
      </Segment>
    </div>
  )
}

export default Comments
