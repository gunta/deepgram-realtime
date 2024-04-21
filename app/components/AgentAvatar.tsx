import { Avatar } from '@nextui-org/react'
import type { Message } from 'ai/react'
import { useAudioStore } from '../context/AudioStore'
import { voiceMap } from '../context/Deepgram'
import { useMessageData } from '../context/MessageMetadata'
import { DgSvg } from './DgSvg'

export const AgentAvatar = ({
  message,
  className = '',
}: {
  message: Message
  className?: string
}) => {
  const { audioStore } = useAudioStore()
  const { messageData } = useMessageData()

  const foundAudio = audioStore.findLast((item) => item.id === message.id)
  const foundData = messageData.findLast((item) => item.id === message.id)

  if (foundAudio?.model) {
    return <Avatar src={voiceMap(foundAudio?.model).avatar} />
  }

  if (foundData?.ttsModel) {
    return <Avatar src={voiceMap(foundData?.ttsModel).avatar} />
  }

  return <DgSvg />
}
