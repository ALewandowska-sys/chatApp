import React, { useEffect, useState } from 'react'
import { loggedUser } from '../../identity/LoggedUser'
import { dictReactionMock } from '../../mocks/dict-reactions-mock'
import { PostResponseMock } from '../../mocks/post-response-mock'
import { DictReaction } from '../../models/DIctReaction'
import { PostResponse } from '../../responses/PostResponse'

export default function PagesUserHome() {

  const [Posts, setPosts] = useState<PostResponse[]>([]);

  useEffect(() => {
    setPosts([...PostResponseMock]);
  }, []);

  const addReaction = (postId: number, reactionId: number) => {

    const posts = [...Posts];
    const reactions = posts.find(p => p.id === postId)!.reactions;

    const isAdded = reactions.find(r => r.user_id === loggedUser.id);
    if(isAdded) {
      if(isAdded.reaction_id === reactionId) {
        const isAddedIndex = reactions.findIndex(r => r.user_id === loggedUser.id)!;
        reactions.splice(isAddedIndex, 1);
      } else {
        const isAddedIndex = reactions.findIndex(r => r.user_id === loggedUser.id)!;
        reactions.splice(isAddedIndex, 1);

        reactions.push({
          reaction_id: reactionId,
          user_id: loggedUser.id,
        });
      }
    } else {
      reactions.push({
        reaction_id: reactionId,
        user_id: loggedUser.id,
      });
    }

    setPosts(posts);
    return;

  }

  const isMyReaction = (postId: number, reactionId: number): string => {
    const reactions = Posts.find(p => p.id === postId)!.reactions;
    const reaction = reactions.find(r => r.reaction_id === reactionId);
    if(reaction) {
      const isClickedByMe = reaction.user_id === loggedUser.id;
      return isClickedByMe ? "rgba(13, 110, 253, 0.3) " : "rgba(255, 255, 255, 0.1) ";

    }

    return "rgba(255, 255, 255, 0.1) ";
  }

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
            Posts.map(( post: PostResponse) => {
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
                          <a key={i} className="btn btn-outline-primary btn-sm mx-1" style={{ backgroundColor: isMyReaction(post.id, reaction.id) }}   onClick={() => addReaction(post.id, reaction.id)}>{reaction.name}</a>
                        )
                      })
                    }
                  </div>
                  <div className="card-footer text-muted">
                    <div>
                      Reactions: { post.reactions.length }
                    </div>
                    <div>
                      <a style={{textDecoration: "none"}}> Pokaż Komentarze: ({post.commentsCount}) </a>
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
