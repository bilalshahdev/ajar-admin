import Container from '@/components/container';
import ZoneForm from '@/components/forms/zone-form';
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
