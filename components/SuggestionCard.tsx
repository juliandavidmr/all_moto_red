import { Motorcycle } from ".prisma/client";
import React from "react";

const SuggestionCard: React.FC<{ motorcycle: Motorcycle }> = ({ motorcycle }) => {
  return (
    <div className="flex-initial cursor-pointer">
      <div className="flex items-center justify-center w-full">
        <div className="w-full py-6 px-3">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="bg-cover bg-center h-56 p-4" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)' }}></div>
            <div className="p-4">
              <p className="uppercase tracking-wide text-sm font-bold text-gray-700">Detached house • 5y old</p>
              <p className="text-3xl text-gray-900">$750,000</p>
              <p className="text-gray-700">742 Evergreen Terrace</p>
            </div>
            <div className="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100">
              <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">Realtor</div>
              <div className="flex items-center pt-2">
                <div className="bg-cover bg-center w-10 h-10 rounded-full mr-3" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1500522144261-ea64433bbe27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80)' }}>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Tiffany Heffner</p>
                  <p className="text-sm text-gray-700">(555) 555-4321</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestionCard;