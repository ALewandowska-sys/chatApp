import React from 'react'
import { postsMock } from '../../mocks/posts-mock'

export default function PagesUserHome() {

  return (
    <div className='container mt-5'>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Write a post</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" placeholder='Tell us how you doing?' rows={3}></textarea>
      </div>

      {
        postsMock.map(( item: any) => {
          return(
            <div key={item.id} className="card mb-3">
              <div className="card-header">
                User id: { item.userId }
              </div>
              <div className="card-body">
                <p className="card-text"> {item.content} </p>
                <a href="#" className="btn btn-primary mx-1">Reaction1</a>
                <a href="#" className="btn btn-primary mx-1">Reaction2</a>
              </div>
              <div className="card-footer text-muted">
                Date example: 2 days ago
              </div>
            </div>
          )
        })
      }

    </div>
  )
}
