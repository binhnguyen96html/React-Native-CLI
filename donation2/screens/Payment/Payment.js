import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, Alert} from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import Header from '../../components/Header/Header';
import style from './style';
import {useSelector} from 'react-redux';
import Button from '../../components/Button/Button';
import {
  CardForm,
  StripeProvider,
  useConfirmPayment,
} from '@stripe/stripe-react-native';
import {PUBLIC_KEY} from '@env';

const Payment = ({navigation}) => {
  const donationItemInformation = useSelector(
    state => state.donations.selectedDonationInformation,
  );
  

  const [isReady, setIsReady] = useState(false);
  const {confirmPayment, loading} = useConfirmPayment();
  const user = useSelector(state => state.user);

  const fetchPaymnetIntentClientSecret = async () => {
    const response = await fetch(
      'http://localhost:4242/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          currency: 'usd',
          amount: donationItemInformation.price * 100,
        }),
      },
    );

    const {clientSecret} = await response.json();
    console.log(clientSecret);
    return clientSecret;
  };
  const handlePayment = async () => {
    const clientSecret = await fetchPaymnetIntentClientSecret();
    const {error, paymentIntent} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
    });
    if (error) {
      Alert.alert(
        'Error has occured with your payment',
        error.localizedMessage,
      );
    } else if (paymentIntent) {
      Alert.alert('Successful', 'The payment was confirmed successfully');
      navigation.goBack()
    }
  };

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView contentContainerStyle={style.paymentContainer}>
        <Header title={'Making Donation'} />

        <Text style={style.donationAmountDescription}>
          You are about to donate {donationItemInformation.price}
        </Text>

        {/* publishableKey={SECRET_KEY} */}
        <View>
          <StripeProvider publishableKey={PUBLIC_KEY}>
            <CardForm
              style={style.cardForm}
              onFormComplete={() => {
                setIsReady(true);
              }}
            />
          </StripeProvider>
        </View>
      </ScrollView>

      <View style={style.button}>
        <Button
          title={'Donate'}
          isDisabled={!isReady || loading}
          onPress={async () => await handlePayment()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Payment;
