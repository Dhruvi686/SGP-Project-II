import React from 'react';
import { Button } from '@/components/ui/button';

const GetInTouch: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
        <p className="text-gray-600 mb-8">
          Have questions? Contact us for more information about your stay.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Contact Us
        </Button>
      </div>
    </section>
  );
};

export default GetInTouch;