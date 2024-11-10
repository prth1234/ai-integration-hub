import React, { useState } from 'react';
import { Modal, ModalContent, ModalBody, Input } from "@nextui-org/react";
import { Search, X } from 'lucide-react';

const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearchClick = () => {
    setIsOpen(true);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className="relative">
      {/* Main search trigger input */}
      <div 
        className="flex items-center h-10 px-4 border rounded-lg cursor-pointer hover:bg-default-100"
        onClick={handleSearchClick}
      >
        <Search className="w-4 h-4 text-default-500" />
        <span className="ml-2 text-sm text-default-500">Search...</span>
        <div className="ml-auto flex items-center space-x-1">
          <kbd className="px-2 py-1 text-xs bg-default-100 rounded">⌘</kbd>
          <kbd className="px-2 py-1 text-xs bg-default-100 rounded">K</kbd>
        </div>
      </div>

      {/* Search Modal */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={setIsOpen}
        placement="top"
        size="2xl"
        backdrop="blur"
        scrollBehavior="inside"
        classNames={{
          base: "max-w-[640px] m-0",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          body: "p-0",
          closeButton: "hidden",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <div className="flex items-center p-4 border-b">
                <Search className="w-4 h-4 text-default-500" />
                <Input
                  className="flex-1 mx-4"
                  classNames={{
                    base: "max-w-full",
                    mainWrapper: "h-full",
                    input: "text-sm",
                    inputWrapper: "h-full font-normal text-default-500 bg-transparent border-0 shadow-none",
                  }}
                  placeholder="Search documentation..."
                  value={search}
                  onValueChange={handleSearchChange}
                  autoFocus
                  variant="flat"
                  size="sm"
                />
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-default-100 rounded-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-4 max-h-[400px] overflow-y-auto">
                {search ? (
                  <div className="text-center text-default-500 py-8">
                    No results for "{search}"
                    <p className="text-sm mt-1">
                      Try searching for something else.
                    </p>
                  </div>
                ) : (
                  <div className="text-sm text-default-500">
                    Start typing to search...
                  </div>
                )}
              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SearchModal;