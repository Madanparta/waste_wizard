import React, { useState } from 'react';
import { Card, Button, FloatingLabel } from 'flowbite-react';
import { Link } from 'react-router-dom';

const InchargePostNews = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Add your form submission logic here
      // (e.g., send data to a server-side API)
  
      console.log('Submitted:', { title, description });
  
      // Reset form after submission
      setTitle('');
      setDescription('');
    };
  
  return (
    <div className='w-screen h-[72vh]'>
      <Card className="container mx-auto px-4 mt-8 w-full h-full md:w-4/12 md:h-fit">
        <h1 className="text-3xl font-bold mb-4">Post News</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <FloatingLabel
            variant="standard"
            label="Enter your news title"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <FloatingLabel
            variant="standard"
            label="Provide a brief description"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            resize="none"
            minrows={4}
          />
          <Button
            type="submit" gradientMonochrome="teal"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium"
          >
            Post
          </Button>
        </form>

        <Link to='/incharge'>
        <Button
            type="button" gradientDuoTone="pinkToOrange" outline
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium"
          >
            Back
          </Button>
        </Link>
      </Card>
    </div>
  );
}

export default InchargePostNews
