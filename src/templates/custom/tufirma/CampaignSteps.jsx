import React, { useEffect, useState } from 'react'

import {Container} from 'react-grid-system'

import Header from './Header'
import Footer from './Footer'

import Step1 from './steps/step1'
import Step2 from './steps/step2'
import { connect } from 'react-redux'
import API from '../../../api'
import {helpers} from '../../../helpers'

const CampaignSteps = (props) => {
  const [step, setStep] = useState(1)
  //step 1 data
  const [type, setType] = useState(null)
  const [category, setCategory] = useState(null)
  //step 2 data
  const [projectName, setProjectName] = useState('')
  const [destinatario, setDestinatario] = useState({
    target_name: '',
    target_addressed: '',
    target_email: '',
    target_phone: '',
    send_email_to_target: false
  })
  const [projectDescription, setProjectDescription] = useState('')
  const [ressources, setRessources] = useState({images: null, video: null})
  const [tags, setTags] = useState([])

  const addTags = (tag) => {
    let Ltags = [...tags]
    Ltags.push(tag)
    setTags(Ltags)
  }

  const deleteTags = (tag) => {
    let Ltags = [...tags]
    const sTag = Ltags.findIndex(t => t === tag)
    Ltags.splice(sTag, 1)
    setTags(Ltags)
  }

  const createPetition = async () => {
    const api = new API({token: props.token, orgID: props.orgID})

    let formData = new FormData()
    const date = new Date()
    let month = `${date.getMonth() + 1}`
    let day = `${date.getDate()}`
    const publishing_date = `${date.getFullYear()}/${month.length > 1 ? month : `0${month}` }/${day.length > 1 ? day : `0${day}`}`

    formData.append('project_name', projectName)
    formData.append('project_description', projectDescription)
    formData.append('term_and_conditions', true)
    formData.append('category_id', category.id)
    formData.append('visibility', true)
    formData.append('type', `${type}`.toLowerCase())
    formData.append('video', ressources.video)
    formData.append('amount_goal', 0)
    formData.append('publishing_date', publishing_date)
    formData.append('send_sms_to_target', false)
    Object.keys(destinatario).map(el => {
      formData.append(el, destinatario[el])
    })
    
    // helpers.appendArray(formData, tags, 'tags')
    // helpers.appendArray(formData, ressources.images, 'images')
    tags.map((tag, i) => {
      formData.append(`tag[${i}]`, tag)
    })
    ressources.images.map((image, i) => {
      formData.append(`images[${i}]`, image)
    })

    try {
      const response = (await api.createPetition(formData)).data
      console.log('Response create petition: ', response)
    } catch (error) {
      console.log('Error create petition: ', error)
    }
  }

  return (
    <Container
      fluid
      style={{
        overflowX: 'hidden'
      }}
    >
      <Header isDash={true}/>
      {step === 1 &&
        <Step1
          changeStep={setStep}
          typeSelected={type}
          categorySelected={category}
          onSelectType={setType}
          onSelectCategory={setCategory}
        />
      }
      {
        step === 2 &&
        <Step2
          changeStep={setStep}
          tags={tags}
          onProjectName={setProjectName}
          onDestinatario={setDestinatario}
          onDescription={setProjectDescription}
          onRessources={setRessources}
          onAddtag={addTags}
          onDeleteTag={deleteTags}
          onComplete={createPetition}
        />
      }
      <Footer />
    </Container>
  )
}

const mapStateToProps = (state, store) => ({
  token: state.auth.token,
  orgID: state.organization.organization.id
})

export default connect(mapStateToProps)(CampaignSteps)