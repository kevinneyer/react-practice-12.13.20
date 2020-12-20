import React from 'react'
import { Button, Comment, Form, Header, Container, Segment } from 'semantic-ui-react'

const Comments  = (props) => {

  return(
    <div>
        <Segment>
          <Container fluid>
            <Header as='h3'>Comments</Header>
            <Comment>
              {props.comments.map( comment =>
                <Comment.Content>
                  <Comment.Text>{comment.content}</Comment.Text>
                </Comment.Content>
              )}
            </Comment>
          </Container>
      </Segment>
    </div>
  )
}

export default Comments
