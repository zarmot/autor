import { useRef, RefObject, ReactNode } from "react"
import { Input, InputRef, Button, ButtonProps } from "antd"
import { GroupProps, InputProps } from "antd/es/input"

export default function InputWithButton(
    props: {
        onClick?: (ref: RefObject<InputRef>) => void
        groupProps?: GroupProps
        inputProps?: InputProps
        buttonProps?: ButtonProps
        buttonChildren?: ReactNode
    }
) {
    const ref = useRef<InputRef>(null)

    return (
        <Input.Group compact {...props.groupProps}>
            <Input ref={ref} {...props.inputProps} />
            <Button 
                onClick={() => {
                    props.onClick?.(ref)
                }} 
                {...props.buttonProps}
            >
                {props.buttonChildren ?? "Save"}
            </Button>
        </Input.Group>
    )
}