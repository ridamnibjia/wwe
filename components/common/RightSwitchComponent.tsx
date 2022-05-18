import React, { useContext, useEffect, useState } from 'react'
import { MatchContext } from '../context/rightSectionData'
import { ThemeContext } from '../context/themeContext'

interface righProps {
    type: string;
}
const RightSwitchComponent = ({ type }: righProps) => {
    const [active, setActive] = useState('wwe')
    const [matchCardData, setMatchCardData] = useState([])
    console.log()
    const { theme } = useContext(ThemeContext)
    const { MatchCardWWE, currentChamps, ppvResults } = useContext(MatchContext)
    const handleChangeType = (text: any) => {
        setActive(text)
    }



    useEffect(() => {
        if (type === 'matchcard') {
            setMatchCardData(MatchCardWWE)
        } else if (type === 'champions') {
            setMatchCardData(currentChamps)
        } else if (type === 'ppvresults') {
            setMatchCardData(ppvResults)
        }
    }, [MatchCardWWE, active, currentChamps, ppvResults])

    console.log(matchCardData)

    return (
        <div style={{ transition: 'all ease 0.5s' }} className='flex flex-col w-full'>
            <div className="flex w-full">
                <button style={{ transition: 'all ease 0.5s' }} onClick={() => handleChangeType('wwe')} className={` ${active === 'wwe' ? 'bg-[#d62c40] text-[#fff]' : theme === 'dark' ? 'bg-main-black' : 'bg-[#f4f4f4] text-[#222] '} ${theme === 'light' ? ' border-[#777]' : 'text-[#fff]  border-[#666] bg-light-black'} border py-4 px-8 flex-1`}>WWE</button>
                <button style={{ transition: 'all ease 0.5s' }} onClick={() => handleChangeType('aew')} className={` ${active === 'aew' ? 'bg-[#d62c40] text-[#fff]' : theme === 'dark' ? 'bg-main-black' : 'bg-[#f4f4f4] text-[#222] '} ${theme === 'light' ? '  border-[#777]' : 'text-[#fff]  border-[#666] bg-light-black'} border py-4 px-8 flex-1`}>AEW</button>
                <button style={{ transition: 'all ease 0.5s' }} onClick={() => handleChangeType('impact')} className={` ${active === 'impact' ? 'bg-[#d62c40] text-[#fff]' : theme === 'dark' ? 'bg-main-black' : 'bg-[#f4f4f4] text-[#222] '} ${theme === 'light' ? ' border-[#777]' : 'text-[#fff]  border-[#666] bg-light-black'} border py-4 px-8 flex-1`}>IMPACT</button>
            </div>
            <div style={{ transition: 'all ease 0.5s' }} className={`${theme === 'light' ? ' border-[#666] bg-white text-[#222] ' : " bg-main-light border-[#efefef]"} h-[400px] overflow-y-scroll  p-2 border`}>
                <div className="flex flex-col ">
                    {matchCardData.map((data, index) => (
                        <>
                            {active === 'wwe' && data[0] != null ?
                                <div key={index} className={`${Number(index) % 2 === 0 && theme === 'light' ? 'bg-[#efefef]' : Number(index) % 2 === 0 && theme === 'dark' ? 'bg-[#555] text-white' : theme === 'dark' ? 'bg-main-light' : 'bg-[#fff] '}  flex flex-col text-center py-2 `}>
                                    <h1 style={{ transition: 'all ease 0.5s' }} className={`${theme === 'light' ? 'text-[#222]' : 'text-[#fff]'} text-lg  uppercase`}>{data[0]}</h1>
                                </div> : active === 'aew' && data[1] != null ?
                                    <div key={index} className={`${Number(index) % 2 === 0 && theme === 'light' ? 'bg-[#efefef]' : Number(index) % 2 === 0 && theme === 'dark' ? 'bg-[#555] text-white' : theme === 'dark' ? 'bg-main-light' : 'bg-[#fff] '}  flex flex-col text-center py-2 `}>
                                        <h1 style={{ transition: 'all ease 0.5s' }} className={`${theme === 'light' ? 'text-[#222]' : 'text-[#fff]'} text-lg  uppercase`}>{data[1]}</h1>
                                    </div> : active === 'impact' && data[2] != null ?
                                        <div key={index} className={`${Number(index) % 2 === 0 && theme === 'light' ? 'bg-[#efefef]' : Number(index) % 2 === 0 && theme === 'dark' ? 'bg-[#555] text-white' : theme === 'dark' ? 'bg-main-light' : 'bg-[#fff] '}  flex flex-col text-center py-2 `}>
                                            <h1 style={{ transition: 'all ease 0.5s' }} className={`${theme === 'light' ? 'text-[#222]' : 'text-[#fff]'} text-lg  uppercase`}>{data[2]}</h1>
                                        </div> : ''}
                        </>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default RightSwitchComponent