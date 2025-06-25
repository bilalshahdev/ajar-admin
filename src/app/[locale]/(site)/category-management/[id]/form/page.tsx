"use client";
import { useSearchParams, useParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CategoryFormBuilder from "@/components/forms/category-form-builder";
import CategoryFormDetail from "@/components/category-form-detail";
import Container from "@/components/container";

export default function CategoryFormPage() {
  const { id } = useParams<{ id: string }>();
  const mode = useSearchParams().get("mode") ?? "view"; // ?mode=edit

  return (
    <Container title="Category Form">
      <Tabs
        defaultValue={mode === "edit" ? "edit" : "view"}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="view">View</TabsTrigger>
          <TabsTrigger value="edit">Edit</TabsTrigger>
        </TabsList>

        <TabsContent value="view">
          <CategoryFormDetail categoryId={id} />
        </TabsContent>

        <TabsContent value="edit">
          <CategoryFormBuilder categoryId={id} />
        </TabsContent>
      </Tabs>
    </Container>
  );
}
