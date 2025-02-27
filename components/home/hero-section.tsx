"use client";

import { TextRotate } from "@/components/text-rotate";
import { LayoutGroup, motion } from "motion/react";
import React from "react";

export const HeroSection = () => {
    return (
        <div className="inset-0 bg-[url('/cover.webp')] bg-center bg-cover bg-gray-500 bg-blend-multiply h-[350px]">
            <div className="flex justify-center items-center align-middle h-full">
                <div className="text-white text-2xl sm:text-5xl">
                    <LayoutGroup>
                        <motion.span className="flex whitespace-pre" layout>
                            <motion.span
                                className="pt-0.5 sm:pt-1 md:pt-2"
                                layout
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            >
                                Make it{" "}
                            </motion.span>
                            <TextRotate
                                texts={[
                                    "tasty!",
                                    "fancy",
                                    "beautiful",
                                ]}
                                mainClassName="text-white px-2 sm:px-2 md:px-3 bg-primary overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-sm"
                                staggerFrom={"last"}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-120%" }}
                                staggerDuration={0.025}
                                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                rotationInterval={2000}
                            />
                        </motion.span>
                    </LayoutGroup>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;