'use client';
import React from 'react';
import { CreateForm } from '../../components/questions/CreateForm';
import { Tracker } from '../../components/questions/questionList';

export default function Create() {
  return (
    <div className="flex items-center flex-col">
      <h2 className="mb-2">Create crochet tracker</h2>
      <CreateForm type={Tracker.crochet} />
    </div>
  );
}
