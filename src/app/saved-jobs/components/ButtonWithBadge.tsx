import { Button } from '../../../components/ui/button'

interface ButtonWithBadgeProps {
    badgeText: string | number;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isTextBold: boolean;
    children: string;
}

export default function ButtonWithBadge({badgeText, onClick, children, isTextBold}: ButtonWithBadgeProps) {
    return (
        <Button className='flex flex-col h-auto w-auto p-1 sm:p-2' onClick={onClick}>
            <h2 className='self-start text-xs'>{badgeText}</h2>
            <h3 className={`${isTextBold && 'font-extrabold'} mt-auto`}>{children}</h3>
        </Button>
    )
}