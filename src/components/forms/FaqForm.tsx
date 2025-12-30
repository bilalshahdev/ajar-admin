"use client";

import { useAddFaq, useGetFaq, useUpdateFaq } from "@/hooks/useFaqs";
import { faqSchema } from "@/validations/faq";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import TextInput from "./fields/TextInput";

const FaqForm = ({
  id,
  closeDialog,
}: {
  id?: string;
  closeDialog?: () => void;
}) => {
  const isEditMode = Boolean(id);

  // ✅ Always call hooks at the top
  const getFaqQuery = useGetFaq(id!, isEditMode); // Always called
  const faq = getFaqQuery?.data?.data;

  const methods = useForm<z.infer<typeof faqSchema>>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: "",
      answer: "",
      order: 1,
    },
  });

  const { handleSubmit, control, reset } = methods;

  useEffect(() => {
    if (faq) {
      reset({
        question: faq.question,
        answer: faq.answer,
        order: faq.order,
      });
    }
  }, [faq, reset]);

  const addFaqMutation = useAddFaq();
  const updateFaqMutation = useUpdateFaq();

  // ✅ Only return null later
  if (isEditMode && !faq && !getFaqQuery.isLoading) {
    toast.error("Faq not found");
    return null;
  }

  const onSubmit = async (data: z.infer<typeof faqSchema>) => {
    try {
      if (isEditMode) {
        await updateFaqMutation.mutateAsync({ id: id!, data });
      } else {
        await addFaqMutation.mutateAsync(data);
      }

      reset();
      closeDialog?.();
    } catch (error) {
      console.error("Faq mutation error:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
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
