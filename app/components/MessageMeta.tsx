import { Tooltip } from '@nextui-org/react'
import type { Message } from 'ai/react'
import { useState } from 'react'
import { useAudioStore } from '../context/AudioStore'
import { useMessageData } from '../context/MessageMetadata'
import { BoltIcon } from './icons/BoltIcon'

const MessageMeta = ({
  message,
  className = '',
}: {
  message: Message
  className?: string
}) => {
  const { audioStore } = useAudioStore()
  const { messageData } = useMessageData()
  const [breakdown, setBreakdown] = useState(false)

  const foundData = messageData.findLast((item) => item.id === message.id)
  const foundAudio = audioStore.findLast((item) => item.id === message.id)

  if (!foundAudio) return

  if (message.role === 'assistant') {
    const llmTotal = Number(foundData?.end) - Number(foundData?.start)
    const ttsTtfb = foundAudio.latency
    const ttsTotal = foundAudio.networkLatency

    return (
      <>
        <div
          className={`flex gap-x-2.5 text-xs text-[#BBBBBF] ${className} flex-wrap`}
        >
          <span>
            <BoltIcon className='w-[1em] h-[1em]' />
          </span>
          <span>TTS (TTFB): {ttsTtfb}ms</span>
          {!!llmTotal && (
            <span className='hidden md:inline'>
              LLM total: {llmTotal.toFixed(1)}ms
            </span>
          )}
          <span className='hidden md:inline'>
            TTS total: {ttsTotal.toFixed(1)}ms
          </span>
        </div>
        <div
          className={`flex md:hidden flex-col gap-2.5 pt-3 text-xs text-[#BBBBBF] ${className} flex-wrap`}
        >
          {!!llmTotal && (
            <span className='inline ml-2'>
              LLM total: {(llmTotal / 1000).toFixed(1)}s
            </span>
          )}

          <span className='inline ml-2'>
            TTS total: {(ttsTotal / 1000).toFixed(1)}s
          </span>
        </div>
      </>
    )
  }
}

export { MessageMeta }
