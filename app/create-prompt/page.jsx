"use client"
import Form from '@components/Form'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { data: session} = useSession();
  const [post, setPost] = useState({
    prompt: "",
    tag: ""
  })

  const createPrompt = async (e) => {
    e.preventDefault();
    try {
      const postPrompt = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      })
      if (postPrompt.ok) {
        router.push('/');
      }
    } catch (error) {
        console.log("[Error Occured While Posting]",error)
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </div>
  )
}

export default CreatePrompt 