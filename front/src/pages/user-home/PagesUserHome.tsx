import React from 'react'
import { dictReactionMock } from '../../mocks/dict-reactions-mock'
import { PostResponseMock } from '../../mocks/post-response-mock'
import { DictReaction } from '../../models/DIctReaction'
import { PostResponse } from '../../responses/PostResponse'

export default function PagesUserHome() {

  return (
    <div className='container mt-5'>
      <div className="shadow p-3 mb-5 bg-body rounded">

        <div className="mb-3">
          <h4>
            <label htmlFor="exampleFormControlTextarea1" className="form-label px-2">Write a post</label>
          </h4>
          <textarea className="form-control" id="exampleFormControlTextarea1" placeholder='Tell us how you doing?' rows={3}></textarea>
          <input type='button' className="btn btn-primary mt-2" value='Send' />
        </div>

      </div>
      <div className="shadow-lg p-3 mb-5 bg-body rounded">
        <div className='mt-3'>
          <h3>Your friends' posts</h3>
          {
            PostResponseMock.map(( post: PostResponse) => {
              return(
                <div key={post.id} className="card mb-3">
                  <div className="card-header">
                    User id: { post.user.id }, name: { `${post.user.firstname} ${post.user.lastname}` }
                  </div>
                  <div className="card-body">
                    <p className="card-text"> {post.content} </p>
                  </div>
                  <div className="card-footer text-muted">
                    {
                      dictReactionMock.map( (reaction: DictReaction, i: number) => {
                        return(
                          <a href="#" className="btn btn-outline-primary btn-sm mx-1">{reaction.name}</a>
                        )
                      })
                    }
                  </div>
                  <div className="card-footer text-muted">
                    <div>
                      Reactions: { post.reactions.length }
                    </div>
                    <div>
                      <a href="#" style={{textDecoration: "none"}}> Pokaż Komentarze: ({post.commentsCount}) </a>
                    </div>
                    <div>
                      { post.created_at.toDateString() }
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>

      </div>

    </div>
  )
}
