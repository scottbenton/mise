import { MotionProps, motion } from "framer-motion";
import { ComponentProps, ElementType, Ref, forwardRef } from "react";

export type MotionComponentProps<T extends ElementType> = {
  motionComponent: T;
} & ComponentProps<T> &
  MotionProps;

function MotionComponentWithoutRef<T extends ElementType>(
  props: MotionComponentProps<T>,
  ref: Ref<HTMLElement>
) {
  const { motionComponent, ...componentProps } = props;

  const ChildrenComponent = motion(motionComponent, {
    forwardMotionProps: false,
  });

  return <ChildrenComponent ref={ref} {...componentProps} />;
}

export const MotionComponent = forwardRef(MotionComponentWithoutRef);
