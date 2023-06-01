import { ChangeEvent, DragEvent, FC, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import PrimaryButton from '../buttons/PrimaryButton';

const MAXLENGTH = 40;

const DragAndDrop:FC<{upload: (files: FileList) => void}> = ({ upload }) => {

    const [files, setFiles] = useState<FileList>();
    const dragOver = (e: DragEvent) => {
        e.preventDefault();
    }

    const dragEnter = (e: DragEvent) => {
        e.preventDefault();
    }

    const dragLeave = (e: DragEvent) => {
        e.preventDefault();
    }

    const fileDrop = (e: DragEvent) => {

        e.preventDefault();

        if(!e.dataTransfer.files) return

        setFiles(e.dataTransfer.files);

        console.log(files);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return 

        setFiles(e.target.files);
    }

    const handleUpload = () => {
        if(files){
            upload(files);
        }
        setFiles(undefined);    
    }

    const truncateString = (str: string, maxLength = MAXLENGTH) => {
        if (str.length <= maxLength) {
          return str;
        }
      
        const firstCharacters = str.slice(0, maxLength / 2 - 2);
        const lastCharacters = str.slice(-maxLength / 2 + 1);
      
        return `${firstCharacters}...${lastCharacters}`;
      }

    return (
        <>
        <div 
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        className="flex min-h-[200px] items-center justify-center">
          {
            files ? 
            <>
            <div  className=' min-h-[200px] w-full p-3 h-full flex flex-col gap-4 items-center justify-center border-dashed border-2 border-primary'>
              <ul className='flex gap-3'>
                {Array.from(files).map((file, index) => (
                  <li  className='truncate' key={index}>{truncateString(file.name)}</li>
                ))}
              </ul>
              <PrimaryButton 
              onClick={handleUpload}
              className='max-w-[25%]'>
                Upload
              </PrimaryButton>
            </div>

            </>:
            <div className='w-full flex flex-col items-center justify-center min-h-[200px] border-2 border-dashed border-primary   '>
            <label htmlFor="fileInput" className='cursor-pointer'>
                <FaCloudUploadAlt size={80} />
                <input
                  id="fileInput"
                  type="file"
                  className='hidden'
                  onChange={handleInputChange}
                />
              </label>
              <h2>Choose a File or Drag it here</h2>
            </div>
          }
        </div>
        </>
    )
}
export default DragAndDrop;