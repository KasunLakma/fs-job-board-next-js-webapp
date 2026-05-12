'use client';
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      zIndex: 9999,
      position: 'relative'
    }}>
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
}
