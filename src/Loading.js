import { useState, useEffect } from 'react';


export default function Loading() {
    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center">
            <p className="text-white">loading...</p>
        </div>

    );
}