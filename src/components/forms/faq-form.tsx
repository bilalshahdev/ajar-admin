"use client";

import { faqSchema } from "@/validations/faq";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextInput from "./fields/text-input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const FaqForm = ({ id }: { id?: string }) => {
  const faq = useSelector((state: RootState) =>
    state.faqs.faqs.find((faq) => faq._id === id)
  );

  const initialData = {
    question: faq?.question || "",
    answer: faq?.answer || "",
    order: faq?.order || 1,
  };
  const methods = useForm<z.infer<typeof faqSchema>>({
    resolver: zodResolver(faqSchema),
    defaultValues: initialData,
  });

  const { handleSubmit, control } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="space-y-2"
      >
        <TextInput
          name="question"
          label="Question"
          placeholder="Enter question"
          control={control}
        />
        <TextInput
          name="answer"
          label="Answer"
          placeholder="Enter answer"
          control={control}
        />
        <TextInput
          name="order"
          label="Order"
          placeholder="Enter order"
          type="number"
          min={1}
          control={control}
        />
        <Button type="submit" variant="button">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default FaqForm;
