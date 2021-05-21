import swal from 'sweetalert';

export const SweetAlert = (
	title,
	text,
	isDanger,
	isInfo,
	isButton,
	msgOk,
	msgCancel,
	action
) => {
	swal({
		title: title,
		text: text,
		icon: isDanger ? 'warning' : isInfo ? 'info' : 'success',
		buttons: isButton ? true : false,
		dangerMode: isDanger ? true : false,
	}).then((willDelete) => {
		if (willDelete) {
			if (action)
				swal(msgOk, {
					icon: 'success',
				});
		} else {
			swal(msgCancel);
		}
	});
};

// export const openNotification = () => {
//     notification.open({
//       message: "Notification Title",
//       description:
//       "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
//       className: "notification-type-info"
//     });
//   };
