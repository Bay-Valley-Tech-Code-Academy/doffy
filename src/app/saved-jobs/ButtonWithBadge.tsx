import { Button } from '../../components/ui/button'

export default function ButtonWithBadge({badgeText, onClick, children}) {
    return (
        <Button className='flex flex-col h-auto' onClick={onClick}>
            <h2 className='self-start text-xs'>{badgeText}</h2>
            <h3 className='mt-auto'>{children}</h3>
        </Button>
    )
}