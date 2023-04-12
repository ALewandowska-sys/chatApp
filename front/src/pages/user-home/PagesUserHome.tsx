import React, { useEffect, useState } from 'react'
import { loggedUser } from '../../identity/LoggedUser'
import { dictReactionMock } from '../../mocks/dict-reactions-mock'
import { PostResponseMock } from '../../mocks/post-response-mock'
import { DictReaction } from '../../models/DIctReaction'
import { PostCommentResponse, PostResponse } from '../../responses/PostResponse'
import { getRandomNumber } from '../../utils/utils.random'
import { getPostComments } from './PagesUserHomeManager'

interface IToggledComment {
  postId: number;
  toggle: boolean;
}

export default function PagesUserHome() {

  const [Posts, setPosts] = useState<PostResponse[]>([]);
  const [ToggledComments, setToggledComments] = useState<IToggledComment[]>([]);
  const [NewPostText, setNewPostText] = useState<string>('');

  useEffect(() => {
    setPosts([...PostResponseMock]);
  }, []);

  const togglePost = (postId: number) => {
    const newToggledComments = [...ToggledComments];
    const commentShowed = newToggledComments.find(t => t.postId === postId);

    if(commentShowed) {
      commentShowed.toggle = !commentShowed.toggle;
      setToggledComments(newToggledComments);
    } else {
      newToggledComments.push({postId, toggle: true})
      setToggledComments(newToggledComments);
    }

  }

  const getToggledComment = (postId: number): boolean => {
    const commentShowed: IToggledComment | undefined = ToggledComments.find(t => t.postId === postId);
    if(commentShowed === undefined) {
      return false;
    }

    return commentShowed.toggle
  }

  const alreadyLoadedComments = (postId: number): boolean => {
    const commentShowed: IToggledComment | undefined = ToggledComments.find(t => t.postId === postId);
    return commentShowed !== undefined;
  }

  const addReaction = (postId: number, reactionId: number) => {

    const posts = [...Posts];
    const reactions = posts.find(p => p.id === postId)!.reactions;

    const isAdded = reactions.find(r => r.user_id === loggedUser.id);
    if(isAdded) {
      const isAddedIndex = reactions.findIndex(r => r.user_id === loggedUser.id)!;
      reactions.splice(isAddedIndex, 1);

      if(isAdded.reaction_id !== reactionId) {
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

  const handleShowComments = (postId: number) => {
    if(alreadyLoadedComments(postId)) {
      togglePost(postId);
      return;
    }

    const comments: PostCommentResponse[] = getPostComments(postId);
    const posts = [...Posts];

    const post = posts.find(p => p.id === postId)!;
    if(!post.comments) {
      post.comments = comments;
    } else {
      post.comments = [...post.comments, ...comments];
    }

    togglePost(postId);
    setPosts(posts);

  }

  const handleSetTextComment = (postId: number, text: any): void => {
    const posts = [...Posts];
    let founded = posts.find(p => p.id === postId)!;
    founded.comment = text.target.value;

    setPosts(posts);
  }

  const handleSetTextPost = (text: any): void => {
    setNewPostText(text.target.value);
  }

  const handleAddComment = (postId: number) => {

    const posts = [...Posts];
    let founded = posts.find(p => p.id === postId)!;
    if(!founded.comments) {
      founded.comments = [];
    }

    founded.comments.push({
      id: getRandomNumber(100, 1000),
      content: founded.comment,
      created_at: new Date(),
      user: loggedUser,
    });

    founded.commentsCount++;
    founded.comment = '';
    setPosts(posts);
  }

  const handleAddPost = () => {
    const posts = [...Posts];
    posts.unshift({
      id: getRandomNumber(100, 1000),
      comment: '',
      commentsCount: 0,
      content: NewPostText,
      created_at: new Date(),
      reactions: [],
      user: loggedUser,
    })
    setPosts(posts);
    setNewPostText('');
  }

  return (
    <div className='container mt-5'>
      <div className="shadow p-3 mb-5 bg-dark text-white rounded">

        <div className="mb-3 bg-dark text-white">
          <h4>
            <label htmlFor="exampleFormControlTextarea1" className="form-label px-2">Write a post</label>
          </h4>
          <textarea className="form-control bg-dark text-white" id="exampleFormControlTextarea1"
            onChange={(text) => handleSetTextPost(text) } placeholder='Tell us how you doing?' rows={3}></textarea>
          <input type='button' className="btn btn-primary mt-2" value='Publish' onClick={handleAddPost} />
        </div>

      </div>
      <div className="shadow-lg p-3 mb-5 bg-dark text-white rounded">
        <div className='mt-3 bg-dark text-white'>
          <h3>Your friends' posts</h3>
          {
            Posts.map(( post: PostResponse) => {
              return(
                <div key={post.id} className="card mb-4 bg-dark text-white">
                  <div className="card-header">
                    user: { `${post.user.firstname} ${post.user.lastname}` } User id: { post.user.id }
                  </div>
                  <div className="card-body">
                    <p className="card-text"> {post.content} </p>
                  </div>
                  <div className="card-footer text-muted">
                    {
                      dictReactionMock.map( (reaction: DictReaction, i: number) => {
                        return(
                          <button key={i} className="btn btn-outline-primary btn-sm mx-1" style={{ backgroundColor: isMyReaction(post.id, reaction.id) }}   onClick={() => addReaction(post.id, reaction.id)}>
                            {reaction.name}
                          </button>
                        )
                      })
                    }
                  </div>
                  <div className="card-footer text-muted d-flex">
                    <div className='mx-2'>
                      <span onClick={() => handleShowComments(post.id)}> Pokaż Komentarze: ({post.commentsCount}) </span>
                    </div>
                    <div className='mx-2'>
                      Reactions: ({ post.reactions.length })
                    </div>
                    <div className='mx-2'>
                      { post.created_at.toDateString() }
                    </div>
                  </div>

                  {
                    post.comments && post.comments?.length > 0 && getToggledComment(post.id) &&
                      <div className='card m-3 p-4'>
                        <h3 className='px-3'>Comments</h3>
                        {
                          post.comments?.map( (comment: PostCommentResponse, i2: number) => {
                            return (
                              <div key={i2} className='card mb-2'>
                                <div className="card-body">
                                <div className="card-header">
                                  user: { `${comment.user.firstname} ${comment.user.lastname}` } User id: { comment.user.id }, { comment.created_at.toDateString() }
                                </div>
                                <div className="card-body">
                                  { comment.content }
                                </div>
                              </div>
                              </div>
                            )
                          })
                        }
                      </div>
                  }

                  <div className="card-footer d-flex">
                    <textarea className="form-control bg-dark text-white" onChange={(text) => handleSetTextComment(post.id, text) } id="exampleFormControlTextarea1" placeholder='Comment..' value={post.comment} rows={1}>
                    </textarea>
                    <input type='button' className="btn btn-primary mx-2" value='Add Comment' onClick={() => handleAddComment(post.id)} />
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
