import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "./commentsSlice";

import styles from './comments.module.css'

function AddComment({ postId }) {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')

  const clearFields = () => {
    setIsLoading(false)
    setName('')
    setEmail('')
    setBody('')
  }

  const formIsValid = (name.trim() !== '' && email.trim() !== '' && body.trim() !== '')

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      alert('Please complete all the fields')
      return
    }

    setIsLoading(true)
    const bodyParams =  { name: name, email: email, body: body }
    dispatch(createComment(postId, bodyParams, clearFields))
  }

  return (
    <div className={styles.newComment}>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Add comment name'
          autoFocus={false}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
        <input
          placeholder='Your email'
          autoFocus={false}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <textarea
          placeholder='What do you think?'
          autoFocus={false}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={isLoading}
        />
        <button >Add Comment</button>
      </form>
    </div>
  );
}

export default AddComment