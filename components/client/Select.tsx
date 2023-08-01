import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/component/ui/select"
import { memo } from "react"
 
export interface DropdownT<T>{
  text: string
  value: T
}

export interface Dropdown{
  text: string
  value: string
}

interface Props {
  options: Dropdown[]
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export function SelectDemo({ options, value, onChange, placeholder }: Props) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="bg-white" >
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup>
          {
            options.map((option) => (
              <SelectItem value={option.value} key={option.value}>{option.text}</SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default memo(SelectDemo)