"use client"

import { ChangeEvent, Dispatch, SetStateAction } from "react"

type Props = {
    query: string,
    setQuery: Dispatch<SetStateAction<string>>
}

export const SearchBar = ({ query, setQuery }: Props) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }
    return <div >
        <input value={query} type="search" className="w-full bg-transparent p-2 outline-none border-2 border-neutral-50 rounded" onChange={onChangeHandler} placeholder="Search Post" />
    </div>
}