import Container from '@/components/Container';
import ZoneForm from '@/components/forms/ZoneForm';
import React from 'react'

const EditZonePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <Container title="Edit Zone">
      <ZoneForm id={id} />
    </Container>
  )
}

export default EditZonePage
