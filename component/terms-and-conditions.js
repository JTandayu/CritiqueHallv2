import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import { Box, Text, Button } from '@chakra-ui/react'
  import { useDisclosure, useColorModeValue, Spacer } from '@chakra-ui/react'


export default function TermsAndConditions() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        <Text fontFamily={'Raleway'} _hover={{cursor: 'pointer', textDecoration: 'underline'}} color={useColorModeValue('#1BA3C1', '#1BA3C1')}><a onClick={onOpen}>Terms and Conditions</a></Text>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={{lg: "40em", base: "20em"}} h={'80vh'} overflowY="auto" css={{
                            '&::-webkit-scrollbar': {
                            width: '4px',
                            },
                            '&::-webkit-scrollbar-track': {
                            width: '6px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                            background: '#212121',
                            borderRadius: '24px',
                            },
                        }}>
          <ModalHeader fontFamily={'Raleway'} fontSize="3xl">Terms and Conditions</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily={'Raleway'} fontWeight={'light'}>
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Terms and Conditions</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>These terms and conditions (&quot;Agreement&quot;) set forth the general terms and conditions of your use of the critiquehall.vercel.app website (&quot;Website&quot; or &quot;Service&quot;) and any of its related products and services (collectively, &quot;Services&quot;). 
            This Agreement is legally binding between you (&quot;User&quot;, &quot;you&quot; or &quot;your&quot;) and this Website operator (&quot;Operator&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;). If you do not agree with the terms of this agreement, you must not accept this agreement and may not access and use the Website and Services. 
            By accessing and using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement. You acknowledge that this Agreement is a contract between you and the Operator, 
            even though it is electronic and is not physically signed by you, and it governs your use of the Website and Services.</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Accounts and Membership</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>If you create an account on the Website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. 
            Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. 
            We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend or disable your account if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill.</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>User Content</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>We do not own any data, 
            information or material (collectively, &quot;Content&quot;) 
            that you submit on the Website in the course of using the Service. 
            You shall have sole responsibility for the accuracy, quality, integrity, legality, reliability, appropriateness, and intellectual property ownership or right to use of all submitted Content. We may, but have no obligation to, monitor and review the Content on the Website submitted or created using our Services by you. You grant us permission to access, copy, distribute, store, transmit, reformat, display and perform the Content of your user account solely as required for the purpose of providing the Services to you. Without limiting any of those representations or warranties, we have the right, though not the obligation, to, in our own sole discretion, refuse or remove any Content that, in our reasonable opinion, violates any of our policies or is in any way harmful or objectionable. Unless specifically permitted by you, your use of the Website and Services does not grant us the license to use, reproduce, adapt, modify, publish or distribute the Content created by you or stored in your user account for commercial, marketing or any similar purpose.</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Adult Content</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>Please be aware that there may be certain adult or mature content available on the Website. 
            Where there is mature or adult content, individuals who are less than 18 years of age or are not permitted to access such content under the laws of any applicable jurisdiction may not access such content. 
            If we learn that that is violated, we will require verified parental consent, in accordance with the Children’s Online Privacy Protection Act of 1998 (&quot;COPPA&quot;).</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Backups</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>We are not responsible for the Content residing on the Website. 
            In no event shall we be held liable for any loss of any Content. It is your sole responsibility to maintain appropriate backup of your Content. </Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Links to Other Resources</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>Although the Website and Services may link to other resources (such as websites, mobile applications, etc.), we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked resource, unless specifically stated herein. 
            We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their resources. We do not assume any responsibility or liability for the actions, products, services, and content of any other third parties. 
            You should carefully review the legal statements and other conditions of use of any resource which you access through a link on the Website. Your linking to any other off-site resources is at your own risk.</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Prohibited Uses</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>In addition to other terms as set forth in the Agreement, you are prohibited from using the Website and Services or Content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Website and Services, third party products and services, or the Internet; (h) to spam, phish, pharm, pretext, spider, crawl, or scrape; (i) for any obscene or immoral purpose; or (j) to interfere with or circumvent the security features of the Website and Services, third party products and services, or the Internet. We reserve the right to terminate your use of the Website and Services for violating any of the prohibited uses.</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Dispute Resolution</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>The formation, interpretation, and performance of this Agreement and any disputes arising out of it shall be governed by the substantive and procedural laws of Philippines without regard to its rules on conflicts or choice of law and, to the extent applicable, the laws of Philippines. 
            The exclusive jurisdiction and venue for actions related to the subject matter hereof shall be the courts located in Philippines, and you hereby submit to the personal jurisdiction of such courts. 
            You hereby waive any right to a jury trial in any proceeding arising out of or related to this Agreement. The United Nations Convention on Contracts for the International Sale of Goods does not apply to this Agreement.</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Changes and Amendments</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>We reserve the right to modify this Agreement or its terms related to the Website and Services at any time at our discretion. When we do, we will revise the updated date at the bottom of this page, and post a notification on the Website. 
            We may also provide notice to you in other ways at our discretion, such as through the contact information you have provided. An updated version of this Agreement will be effective immediately upon the posting of the revised Agreement unless otherwise specified. 
            Your continued use of the Website and Services after the effective date of the revised Agreement (or such other act specified at that time) will constitute your consent to those changes.</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Acceptance of these Terms</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>You acknowledge that you have read this Agreement and agree to all its terms and conditions. 
            By accessing and using the Website and Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to access or use the Website and Services.</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Contacting Us</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>If you have any questions, concerns, or complaints regarding this Agreement, we encourage you to contact us using this email:</Text>
            <Spacer />
            <br />
            <Text fontFamily={'Raleway'} fontStyle={'italic'} color={useColorModeValue("#C1272D", "#FF5C61")}>critiquehall@gmail.com</Text>
            <Spacer />
            <br />
            <Text fontFamily={'Raleway'} fontSize="sm">This Agreement was created on February 16, 2022. No changes have been made since.</Text>
          </ModalBody>

          <ModalFooter>
            <Button fontFamily={'Raleway'}  bgColor={useColorModeValue('#2777C1','#0085FF')} color={useColorModeValue('#FFFFFF', '#FFFFFF')} _hover={{bgColor: useColorModeValue('#56AEFF', '#0B5090')}} mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
        </>
    )
}
