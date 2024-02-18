import { Button, Label, Radio } from 'flowbite-react'
import React from 'react'

const InchargeReports = () => {
  return (
    <div className='w-screen h-[72vh] flex justify-center'>
        <fieldset className="w-full h-fit max-w-md flex-col gap-4 border p-5 flex mt-5 shadow-sm">
            <legend className="mb-4 font-bold">Pie Chart based on:</legend>

            <div className="flex items-center gap-2">
                <Radio id="category" name="report" value=""  />
                <Label htmlFor="category">Category</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="status" name="report" value=""  />
                <Label htmlFor="status">Status</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="rating" name="report" value=""  />
                <Label htmlFor="rating">Rating</Label>
            </div>

            <Button outline gradientDuoTone="purpleToBlue">View Report</Button>

        </fieldset>
    </div>
  )
}

export default InchargeReports
