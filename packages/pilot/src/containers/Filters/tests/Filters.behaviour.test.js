import cases from 'jest-in-case'

import DateInput from './../../../components/DateInput'
import SearchField from './../../../components/Input'
import Button from './../../../components/Button'
import Tag from '../../../components/Tag'
import compileTags from '../../../containers/Filters/compileTags'
import { CardActions } from './../../../components/Card'
import {
  filterOptions,
  toggleFilterOptions,
  getCheckedCheckboxes,
} from './common'

import beforeSubmit from './behaviourBeforeCases'

import {
  afterClear,
  afterSubmit,
} from './behaviourAfterCases'


describe('Filters', () => {
  describe('Behaviour tests', () => {
    describe('after clear', () => {
      cases('should SearchInput have no value', ({
        component,
        expectedSearchValue,
      }) => {
        const searchInput = component
          .find(SearchField)
          .first()

        expect(searchInput.props().value).toBe(expectedSearchValue)
      }, afterClear.searchInputCase)

      cases('should DateInput have the same value', ({
        component,
        dates,
      }) => {
        const dateInput = component
          .find(DateInput)
          .first()

        expect(dateInput.props().dates).toBe(dates)
      }, afterClear.dateInputCase)

      cases('should not have selected checkboxes', ({
        component,
        selectedFilters,
      }) => {
        // expand filters section
        toggleFilterOptions(component)

        const checkboxes = getCheckedCheckboxes(component)
          .map(node => node.props().value)

        // collapse filters section
        toggleFilterOptions(component)

        expect(checkboxes).toEqual(selectedFilters)
      }, afterClear.selectedCheckboxesCase)

      cases('should onChange be called with default values', ({
        onChange,
        defaultProps,
      }) => {
        expect(onChange).toBeCalledWith(defaultProps)
      }, afterClear.onChangeCase)
    })

    describe('before submit', () => {
      cases('should have submit button with correct disabled prop', ({
        component,
        expectedButtonDisabledState,
      }) => {
        const submitButton = component
          .find(CardActions)
          .findWhere(node => node.is(Button) && node.prop('type') === 'submit')

        expect(submitButton.props().disabled).toBe(expectedButtonDisabledState)
      }, beforeSubmit.submitButtonDisabledCase)

      cases('should have submit button with correct relevance', ({
        component,
        buttonRelevance,
      }) => {
        const submitButton = component
          .find(CardActions)
          .find(Button)
          .last()

        expect(submitButton.props().relevance).toBe(buttonRelevance)
      }, beforeSubmit.submitButtonRelevanceCase)

      cases('should have reset button with correct relevance', ({
        component,
        buttonRelevance,
      }) => {
        const resetButton = component
          .find(CardActions)
          .findWhere(node => node.is(Button) && node.prop('type') !== 'submit')

        expect(resetButton.props().relevance).toBe(buttonRelevance)
      }, beforeSubmit.resetButtonRelevanceCase)

      cases('should have correct Tag components', ({
        component,
        selectedFilters,
      }) => {
        const tags = component.find(Tag)
          .map(node => node.props().children)


        const expectedTags = compileTags(filterOptions, selectedFilters)
          .map(tag => tag.label)

        expect(tags).toEqual(expectedTags)
      }, beforeSubmit.correctTagCase)

      cases('should DateInput value be the same as dates prop', ({ component, dates }) => {
        const dateInputProps = component
          .find(DateInput)
          .props()

        expect(dateInputProps.dates).toBe(dates)
      }, beforeSubmit.dateInputDatesCase)

      cases('should SearchInput value be the same as search prop', ({ component, searchValue }) => {
        const searchInput = component
          .find(SearchField)
          .find('input')

        expect(searchInput.props().value).toBe(searchValue)
      }, beforeSubmit.searchInputSearchCase)

      cases('should onChange function be called with correct values', ({
        defaultProps,
        onChange,
        shouldCallOnChange,
      }) => {
        if (shouldCallOnChange) {
          const { values, dates, search } = defaultProps
          expect(onChange).toBeCalledWith({ values, dates, search })
        } else {
          expect(onChange).not.toBeCalled()
        }
      }, beforeSubmit.onChangeCase)
    })

    describe('after submit', () => {
      cases('should have submit button with correct disabled prop', ({
        component,
        expectedButtonDisabledState,
      }) => {
        const submitButton = component
          .find(CardActions)
          .findWhere(node => node.is(Button) && node.prop('type') === 'submit')
        expect(submitButton.props().disabled).toBe(expectedButtonDisabledState)
      }, afterSubmit.submitButtonDisabledCase)

      cases('should have submit button with correct relevance', ({
        component,
        buttonRelevance,
      }) => {
        const submitButton = component
          .find(CardActions)
          .find(Button)
          .last()
        expect(submitButton.props().relevance).toBe(buttonRelevance)
      }, afterSubmit.submitButtonRelevanceCase)

      cases('should have reset button with correct relevance', ({
        component,
        buttonRelevance,
      }) => {
        const resetButton = component
          .find(CardActions)
          .findWhere(node => node.is(Button) && node.prop('type') !== 'submit')
        expect(resetButton.props().relevance).toBe(buttonRelevance)
      }, afterSubmit.resetButtonRelevanceCase)

      cases('should have correct Tag components', ({ component, selectedFilters }) => {
        const tags = component.find(Tag)
          .map(node => node.props().children)

        const expectedTags = compileTags(filterOptions, selectedFilters)
          .map(tag => tag.label)

        expect(tags).toEqual(expectedTags)
      }, afterSubmit.correctTagCase)

      cases('should DateInput value be the same as dates prop', ({
        component,
        dates,
      }) => {
        const dateInputProps = component
          .find(DateInput)
          .props()

        expect(dateInputProps.dates).toBe(dates)
      }, afterSubmit.dateInputDatesCase)

      cases('should SearchInput value be the same as search prop', ({ component, searchValue }) => {
        const searchInput = component
          .find(SearchField)
          .find('input')

        expect(searchInput.props().value).toBe(searchValue)
      }, afterSubmit.searchInputSearchCase)

      cases('should onChange function be called with correct values', ({
        onChange,
        search,
        dates,
        selectedFilters,
      }) => {
        expect(onChange).toBeCalledWith({
          values: selectedFilters,
          search,
          dates,
        })
      }, afterSubmit.onChangeCase)
    })
  })
})
