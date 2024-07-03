import { defineStore } from 'pinia'

export const viewTagsStore = defineStore('viewTags', () => {
	// 定义state
	const viewTags = ref([])

	// 定义action
	const pushViewTags = (route) => {
		const target = viewTags.value.find((item) => item.path === route.path)
		const isName = route.name
		if (!target && isName) {
			viewTags.value.push(route)
		}
		if (target) {
			viewTags.value.forEach((item, index) => {
				if (item.path === route.path) {
					viewTags.value[index] = { ...route, ...item }
					// Object.assign(item, route)
				}
			})
		}
	}
	const removeViewTags = (route) => {
		viewTags.value.forEach((item, index) => {
			if (item.fullPath === route.fullPath) {
				viewTags.value.splice(index, 1)
			}
		})
	}
	const updateViewTags = (route) => {
		viewTags.value.forEach((item, index) => {
			if (item.fullPath === route.fullPath) {
				viewTags.value[index] = { ...route, ...item }
				// Object.assign(item, route)
			}
		})
	}
	const updateViewTagsTitle = (title = '') => {
		const nowFullPath = location.hash.substring(1)
		viewTags.value.forEach((item) => {
			if (item.fullPath === nowFullPath) {
				item.meta.title = title
			}
		})
	}
	const clearViewTags = () => {
		viewTags.value = []
	}

	return {
		viewTags,
		pushViewTags,
		removeViewTags,
		updateViewTags,
		updateViewTagsTitle,
		clearViewTags
	}
})
